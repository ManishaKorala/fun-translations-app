import type { Route } from "./+types/translate";
import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";
import type { Translation } from "domain/types/Translation";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fun Translator - Yoda & More" },
    { name: "description", content: "Translate text into Yoda speak, Pirate, and more!" },
  ];
}

// Define the return type of the action
type TranslateActionResult = Translation | { error: string };

export const action = async ({ request }: Route.ActionArgs): Promise<TranslateActionResult> => {
  if (request.method !== "POST") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  // Extract form data from the request
  const formData = await request.formData();
  const textToTranslate = formData.get("text") as string;

  if (!textToTranslate || textToTranslate.trim() === "") {
    return { error: "Please enter some text to translate" };
  }

  try {
    const translationService = createDefaultFunTranslationService();
    const translation = await translationService.getTranslation(textToTranslate);    
    return translation;
  } catch (error) {
    console.error("Translation error:", error);
    return { 
      error: "Failed to translate. Please try again." 
    };
  }
};

export default function Translate() {
  const data = useActionData<TranslateActionResult>();

  // check if data has 'error' property
  const isError = data && "error" in data;
  
  // check if data is a Translation (has 'translated' property)
  const isSuccess = data && "translated" in data;

  return (
    <div className="flex h-full py-3">
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm />
        
        {/* Error handling */}
        {isError && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-semibold">Error</p>
            <p>{data.error}</p>
          </div>
        )}

        {/* Success result display */}
        {isSuccess && (
          <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <div className="mb-4">
              <p className="text-sm text-gray-600 font-semibold uppercase">Original Text</p>
              <p className="text-lg text-gray-900 mt-2">{data.text}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 font-semibold uppercase">
                Translation ({data.engine})
              </p>
              <p className="text-xl text-blue-700 font-semibold mt-2">{data.translated}</p>
            </div>
          </div>
        )}
      </Content>
    </div>
  );
}
