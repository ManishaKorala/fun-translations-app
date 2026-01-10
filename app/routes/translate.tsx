import type { Route } from "./+types/translate";
import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fun Translator - Yoda & More" },
    { name: "description", content: "Translate text into Yoda speak, Pirate, and more!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  console.log('testing data: ', request)
  if (request.method !== "POST") {
    throw new Response("Method Not Allowed", { status: 405 });
  }

  // Extract form data from the request
  const formData = await request.formData();
  const textToTranslate = formData.get("text") as string;

  if (!textToTranslate || textToTranslate.trim() === "") {
    return { error: "Please enter some text to translate" };
  }

  const translationService = createDefaultFunTranslationService();
  const translation = await translationService.getTranslation(textToTranslate);

  return translation;
};

export default function Translate() {
  const translation = useActionData();

  return (
    <div className="flex h-full py-3">
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm />
        {JSON.stringify(translation)}
      </Content>
    </div>
  );
}
