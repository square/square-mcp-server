//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const make_api_requestEval: EvalFunction = {
    name: 'make_api_request Tool Evaluation',
    description: 'Evaluates the usage of the make_api_request tool for listing items in the Square catalog',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please use the make_api_request tool with service set to 'catalog' and method set to 'list' to retrieve all catalog items.");
        return JSON.parse(result);
    }
};

const get_type_infoEval: EvalFunction = {
    name: "get_type_info Tool Evaluation",
    description: "Evaluates the get_type_info tool functionality by retrieving type information for a Square API method",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve the type info for the 'catalog' service with the 'list' method using the get_type_info tool.");
        return JSON.parse(result);
    }
};

const get_service_infoEvalFunction: EvalFunction = {
    name: "get_service_info Tool Evaluation",
    description: "Evaluates the functionality of get_service_info tool",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Could you provide information about the 'catalog' Square API service?");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [make_api_requestEval, get_type_infoEval, get_service_infoEvalFunction]
};
  
export default config;
  
export const evals = [make_api_requestEval, get_type_infoEval, get_service_infoEvalFunction];