import { FC } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { ckeditorConfiguration, ckeditorExampleContent } from "../ckeditor";

export const ClassicEditorExample: FC = () => {
  return (
    <div>
      <h2>
        Using CKEditor&nbsp;5 Classic Editor with the generated content plugin
      </h2>
      <CKEditor
        editor={ClassicEditor}
        config={ckeditorConfiguration}
        data={ckeditorExampleContent}
      />
    </div>
  );
};
