import Button from "view/components/Button";
import Input from "view/components/Input";
import type { Engine } from "domain/types/Engine";
import { useState } from "react";

export function TranslateForm() {
  const [selectedEngine, setSelectedEngine] = useState<Engine>("yoda");

  return (
    <form className="contents" method="POST" action="/translate">
      <fieldset className="flex flex-col items-start gap-6">
        {/* Engine selector */}
        <div className="w-full max-w-sm">
          <label htmlFor="engine" className="block text-sm font-semibold mb-2">
            Choose Translation Engine:
          </label>
          <select
            id="engine"
            name="engine"
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value as Engine)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="yoda">🧙 Yoda</option>
            <option value="pirate">🏴‍☠️ Pirate</option>
          </select>
        </div>
        <Input className="w-full max-w-sm" name="text" placeholder="Enter the text to translate here" />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" type="submit">Translate</Button>
      </fieldset>
    </form>
  );
}
