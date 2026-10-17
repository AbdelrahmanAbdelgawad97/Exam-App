import {DIPLOMA_ENDPOINT} from "./auth.endpoint"
import type { IDiplomaPayload } from "../user/types/iDiplomaPayload";
import { api } from "../../shared/lib/axios";
import getToken from "../../hooks/use-token"
import type { ExamResponse } from "../user/types/ITests";
import type { IExam } from "../user/types/iDiploma";
import type { IQuestions } from "../user/types/iQuestions";
import type { ExamSubmissionRequest, ExamSubmissionResponse } from "../user/types/iAnswers";
import type { finalResults } from "../user/types/iResults";
import type { DiplomaDetails } from "../user/types/iSpecificDiplomaDetails";
import type { addDiplomaType } from "../admin/AdminAddNewDiploma";
import type { SendPhoto, UploadPhotoInterface } from "../user/types/iPhoto";
import type { addExamType } from "../admin/exams/AdminCreateNewExam";
import type { SpecificExamById } from "../user/types/iSpecificExam";
import type { ExamData } from "../user/types/iExam";
import type { AddingAnswer } from "../user/types/iAddingAnswersAdmin";
import type { GetQuestionsForExam } from "../user/types/iGetQuestionsAPI";
import type { QuestionAndAnswers } from "../user/types/iQuestionAndAnswers";

let theToken = getToken().getToken();
export let submissionId: string;

// get all diploma paginated
export async function getAllDiplomas(pageNumber?: number) {
    theToken = getToken().getToken();

    const url = pageNumber
        ? `${DIPLOMA_ENDPOINT}/diplomas?page=${pageNumber}`
        : `${DIPLOMA_ENDPOINT}/diplomas`;

    const response = await api.get<IDiplomaPayload>(url, {
        headers: {
            Authorization: `Bearer ${theToken}`,
        },
    });

    return response.data.payload;
}

// get all diploma 
export async function getAllDiplomasPages() {
  const firstResponse = await getAllDiplomas(1);

  const totalPages = firstResponse.metadata.totalPages;

  const responses = await Promise.all(
    Array.from({ length: totalPages }, (_, index) =>
      getAllDiplomas(index + 1)
    )
  );

  return responses.flatMap(
    (response) => response.data
  );
}



export async function  getAllDiplomasTopics(id: string|undefined) {
    theToken = getToken().getToken();
    const response = await api.get<IExam>(`${DIPLOMA_ENDPOINT}/diplomas/${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    return response.data.payload.diploma;
}

// diploma exames 
export async function  getAllDiplomasAllExams(id: string|undefined) {
    theToken = getToken().getToken();
    const response = await api.get<ExamResponse>(`${DIPLOMA_ENDPOINT}/exams?diplomaId=${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    return response.data.payload;
}

// get all exam questions 

export async function  getAllSpecificExam(id: string|undefined) {
    theToken = getToken().getToken();
    const response = await api.get<IQuestions>(`${DIPLOMA_ENDPOINT}/questions/exam/${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    return response.data.payload.questions;
}

// get all specificExam 

export async function  getSpecificDiplomaDetails(id: string|undefined) {
    theToken = getToken().getToken();
    console.log(id);
    const response = await api.get<IQuestions>(`${DIPLOMA_ENDPOINT}/exams/${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    
    
    return response.data.payload;
}

// get Exam By Id

export async function  getSpecificExam(id: string|undefined) {
    theToken = getToken().getToken();
    const response = await api.get<SpecificExamById>(`${DIPLOMA_ENDPOINT}/exams/${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    
    
    return response.data;
}

// Update Specific Exam

export async function  adminUpdateSpecificExam(id: string, data:ExamData) {
    theToken = getToken().getToken();
    const response = await api.put(`${DIPLOMA_ENDPOINT}/exams/${id}`,data,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// get all specificExam 

export async function  createNewExam(data: addExamType) {
    theToken = getToken().getToken();
    console.log(data)
    const response = await api.post<IQuestions>(`${DIPLOMA_ENDPOINT}/exams`,data,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    console.log(response)
}
// get all diplomaDetails 

export async function  getDiplomaDetails(id: string|undefined) {
    theToken = getToken().getToken();
    const response = await api.get<DiplomaDetails>(`${DIPLOMA_ENDPOINT}/diplomas/${id}` ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    return response.data;
}

// send all answers 

export async function  sendAllAnswers(answers: ExamSubmissionRequest) {
    theToken = getToken().getToken();
    const response = await api.post<ExamSubmissionResponse>(`${DIPLOMA_ENDPOINT}/submissions`,answers ,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    submissionId = response.data.payload.submission.id;
    console.log(submissionId);
    return response.data.payload.submission.id;
}

//  Get All Submitions 
export async function  getAllSubmitions(id: string) {
    theToken = getToken().getToken();
    const response = await api.get<finalResults>(`${DIPLOMA_ENDPOINT}/submissions/${id}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
    return response.data;
}


// upload an Image 


export async function  uploadImage(value: SendPhoto) {
    theToken = getToken().getToken();
    const formData = new FormData()
    formData.append("image" ,value.image)
    const response = await api.post(`/api/upload`,formData,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

    return response.data.payload.url;
}

// Add New Diploma 

export async function  addNewDiploma(value: addDiplomaType) {
    theToken = getToken().getToken();
    const response = await api.post<addDiplomaType>(`${DIPLOMA_ENDPOINT}/diplomas`,value,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// Delete the Diploma 

export async function  adminDeleteDiploma(value: string) {
    theToken = getToken().getToken();
    const response = await api.delete(`${DIPLOMA_ENDPOINT}/diplomas/${value}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// update the Diploma 

export async function  adminUpdateDiploma(id: string, data:addDiplomaType) {
    theToken = getToken().getToken();
    const response = await api.put(`${DIPLOMA_ENDPOINT}/diplomas/${id}`,data,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// Delete the Diploma 

export async function  adminDeleteExam(value: string) {
    theToken = getToken().getToken();
    const response = await api.delete(`${DIPLOMA_ENDPOINT}/exams/${value}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// Add New Question 
export async function  addQuestions(id: string,value: AddingAnswer) {
    theToken = getToken().getToken();
    await api.post<addDiplomaType>(`${DIPLOMA_ENDPOINT}/questions/exam/${id}`,value,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

}

// get all questions for an exam 

export async function getSpecificQuestions(params:string) {
    theToken = getToken().getToken();
    const response = await api.get<GetQuestionsForExam>(`${DIPLOMA_ENDPOINT}/questions/exam/${params}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

    return response
}

// get specific

export async function getOneQuestion(params:string) {
    theToken = getToken().getToken();
    const response = await api.get<QuestionAndAnswers>(`${DIPLOMA_ENDPOINT}/questions/${params}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });

    return response
}

// update question 

export async function  adminUpdateQuestion(id: string, data:AddingAnswer) {
    theToken = getToken().getToken();
    console.log("update Question ===>", data);
    const response = await api.put(`${DIPLOMA_ENDPOINT}/questions/${id}`,data,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}

// Delete Question 
export async function  adminDeleteQuestion(id: string) {
    theToken = getToken().getToken();
    const response = await api.delete(`${DIPLOMA_ENDPOINT}/questions/${id}`,{
        headers: {
            Authorization: `Bearer ${theToken}`,
        }
    });
}