import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { GeneratedContent } from "./plugins/inlineWidgetExamplePlugin";

export const ckeditorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, GeneratedContent],
  toolbar: ["bold", "italic"],
};
