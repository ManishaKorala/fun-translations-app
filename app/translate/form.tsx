import Button from "view/components/Button";
import Input from "view/components/Input";
import { Form } from "react-router";
import { useRef } from "react";

export function TranslateForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Reset the form after submits
    setTimeout(() => {
      formRef.current?.reset();
    }, 100);
  };

  return (
    <Form 
    ref={formRef}
    method="POST"
    action="/translate"
    className="contents"
    onSubmit={handleSubmit}
    >
      <fieldset className="flex flex-col items-start gap-6">
        {/* Engine selector */}
        <div className="w-full max-w-sm">
          <label htmlFor="engine" className="block text-sm font-semibold mb-2">
            Choose Translation Engine:
          </label>
          <select
            id="engine"
            name="engine"
            defaultValue="yoda"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yoda">🧙 Yoda</option>
            <option value="pirate">🏴‍☠️ Pirate</option>
          </select>
        </div>
        <Input className="w-full max-w-sm" name="text" placeholder="Enter the text to translate here" />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" type="submit">Translate</Button>
      </fieldset>
    </Form>
  );
}
