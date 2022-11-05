import React, { createContext, useState, useEffect } from 'react';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED } from '../constants/request.constants';
import { createUserDocument, getUserDocumentById } from '../utils/database.utils';
import QUEST_TYPE from '../constants/question.constants';

const initialState = REQUEST_PENDING({});

export const QuizContext = createContext(initialState);

export const QuizProvider = ({ children }) => {
   const [state, setState] = useState(initialState);

   const getResponse = (key) => {
        if(Object.keys(QUEST_TYPE).find(cur => key===cur)==0) return null;
        return state.data[key];
   }
   const setResponse = (key,value) => {
        if(Object.keys(QUEST_TYPE).find(cur => key===cur)) return false;

        setState((curState) => {
            return {
                ...curState,
                data:{
                    ...curState.data,
                    [key]:value
                }
            }
        })
        // return state;
        console.log(state)
        return true;
   }
   const flushResponse = () => {
    setState(REQUEST_SUCCESS({}));
   }
   return(
    <QuizContext.Provider value = {{getResponse, setResponse, getAllResponses:state.data, flushResponse}}> 
            {children} 
    </QuizContext.Provider>
   )
}