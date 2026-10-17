import type { RouteObject } from "react-router";
import DiplomaPage from "./pages/DiplomaPage";
import ExamComponant from "../../exams/ExamComponent/ExamComponant";
import UserInfo from "../../user/UserInfo/UserInfo";
import UserData from "../../user/UserInfo/UserData";
import UserChangePassword from "../../user/UserInfo/UserChangePassword";
import Exams from "../../exams/ExamComponent/Exams";
import Diplomas from "../../exams/ExamComponent/Diplomas";
import Questions from "../../exams/ExamComponent/Questions";
import Results from "../../exams/ExamComponent/Results";
import AdmineDiploma from "../../admin/AdmineDiploma";
import AdmineDiplomaDetails from "../../admin/AdmineDiplomaDetails";
import AdminAddNewDiploma from "../../admin/AdminAddNewDiploma";
import AdminUpdateDiploma from "../../admin/AdminUpdateDiploma";
import AdminExams from "../../admin/exams/AdminExams";
import AdminExamDetails from "../../admin/exams/AdminExamDetails";
import AdminCreateNewExam from "../../admin/exams/AdminCreateNewExam";
import AdmineUpdateExam from "../../admin/exams/AdmineUpdateExam";
import ExamAddQuestions from "../../admin/exams/ExamAddQuestions";
import QuestionDetails from "../../admin/exams/QuestionDetails";
import AuditLogList from "../../admin/logs/AuditLogList";
import AuditLogDetails from "../../admin/logs/AuditLogDetails";


export const diplomaRoutes: RouteObject[] = [
  {
      path: '/',
      element: <DiplomaPage /> , 
      children: [
    {
      path: "/exams",
      element: <ExamComponant />,
      children: [
        {
          path: "/exams/adminDiploma",
          element: < AdmineDiploma/>,
        } ,
        {
          path: "/exams/adminDiploma/:id",
          element: < AdmineDiplomaDetails/>,
        } ,
        {
          path: "/exams/adminDiploma/addNewOne",
          element: < AdminAddNewDiploma />,
        } ,
        {
          path: "/exams/adminDiploma/edit/:id",
          element: < AdminUpdateDiploma />,
        } ,
        {
          path: "/exams/adminExams",
          element: < AdminExams />,
        } ,
        {
          path: "/exams/adminExams/createNewExam",
          element: < AdminCreateNewExam />,
        } ,
        {
          path: "/exams/adminExams/updateExam/:id",
          element: < AdmineUpdateExam />,
        } ,
        {
          path: "/exams/adminExams/:id",
          element: < AdminExamDetails />,
        } ,
        {
          path: "/exams/adminAddQuestion/:id?",
          element: < ExamAddQuestions />,
        },
        {
          path: "/exams/QuestionDetails/:id",
          element: < QuestionDetails />,
        },
        {
          path: "/exams/auditLogList",
          element: < AuditLogList />,
        },
        {
          path: "/exams/auditLogDetails/:id",
          element: < AuditLogDetails />,
        },


        {
          path: "/exams/diplomas",
          element: <Diplomas />,
        } ,
        {
          path: ":id",
          element: <Exams />
        },
        {
          path: ":id/:id",
          element: <Questions />
        },
        {
          path: "/exams/result",
          element: <Results />
        }
      ]
    },


    {
      path: "/userInfo",
      element: <UserInfo />,
      children: [
        {
          path: "/userInfo/profile",
          element: <UserData />, 
        },
        {
          path: "/userInfo/UserChangePassword",
          element: <UserChangePassword />, 
        },
      ]
    },
      ]
  },
]

