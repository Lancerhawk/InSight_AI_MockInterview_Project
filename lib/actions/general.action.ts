'use server'

import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../mongodb";
import { generateObject } from "ai";
import { feedbackSchema } from "@/constants";
import { google } from "@ai-sdk/google";

export async function getInterviewsByUserId(userId: string) {
    try {
        const client = await clientPromise;
        const db = (client as MongoClient).db();
        const interviews = await db.collection('interviews').find({ userId }).sort({ createdAt: -1 }).toArray();
        return interviews.map((i) => ({ ...i, id: i._id?.toString() }));
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getLatestInterviews({ userId }: { userId: string }) {
    try {
        const client = await clientPromise;
        const db = (client as MongoClient).db();
        const interviews = await db.collection('interviews').find({ userId: { $ne: userId } }).sort({ createdAt: -1 }).limit(10).toArray();
        return interviews.map((i) => ({ ...i, id: i._id?.toString() }));
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getInterviewsById(id: string): Promise<Interview | null> {
    try {
        const client = await clientPromise;
        const db = (client as MongoClient).db();
        const interview = await db.collection('interviews').findOne({ _id: new ObjectId(id) });
        if (!interview) return null;
        return {
            id: interview._id?.toString() || '',
            role: interview.role || '',
            level: interview.level || '',
            questions: interview.questions || [],
            techstack: interview.techstack || [],
            createdAt: interview.createdAt || '',
            userId: interview.userId || '',
            type: interview.type || '',
            finalized: interview.finalized ?? false,
            coverImage: interview.coverImage || '',
        } as Interview;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript } = params;

    try {
        const client = await clientPromise;
        const db = (client as MongoClient).db();
        const formattedTranscript = transcript.map((sentence: { role: string; content: string; }) => (
            `-${sentence.role}: ${sentence.content}\n`
        )).join('');

        const { object: {totalScore, categoryScores, strengths, areasForImprovement, finalAssessment} } = await generateObject({
            model: google('gemini-2.0-flash-001', {
                structuredOutputs: false,
            }),
            schema: feedbackSchema,
            prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        });

        const feedbackDoc = {
            interviewId,
            userId,
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment,
            createdAt: new Date().toISOString(),
        };

        const result = await db.collection('feedback').updateOne(
          { interviewId, userId },
          { $set: feedbackDoc },
          { upsert: true }
        );

        return {
            success: true,
            feedback: result.upsertedId ? result.upsertedId.toString() : undefined,
        };
    } catch (e) {
        console.error(e);
        return { success: false };
    }
}

export async function getFeedbackByInterviewId({ interviewId, userId }: { interviewId: string, userId: string }) {
  try {
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    const feedback = await db.collection('feedback').findOne({ interviewId, userId });
    if (!feedback) return null;
    return {
      id: feedback._id?.toString() || '',
      interviewId: feedback.interviewId,
      userId: feedback.userId,
      totalScore: feedback.totalScore,
      categoryScores: feedback.categoryScores,
      strengths: feedback.strengths,
      areasForImprovement: feedback.areasForImprovement,
      finalAssessment: feedback.finalAssessment,
      createdAt: feedback.createdAt,
    } as Feedback;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFeedbacksByUserId(userId: string) {
  try {
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    const feedbacks = await db.collection('feedback').find({ userId }).toArray();
    const feedbackMap: Record<string, Feedback> = {};
    feedbacks.forEach(fb => {
      if (fb.interviewId) {
        feedbackMap[fb.interviewId] = {
          id: fb._id?.toString() || '',
          interviewId: fb.interviewId,
          totalScore: fb.totalScore,
          categoryScores: fb.categoryScores,
          strengths: fb.strengths,
          areasForImprovement: fb.areasForImprovement,
          finalAssessment: fb.finalAssessment,
          createdAt: fb.createdAt,
        };
      }
    });
    return feedbackMap;
  } catch (error) {
    console.log(error);
    return {};
  }
}