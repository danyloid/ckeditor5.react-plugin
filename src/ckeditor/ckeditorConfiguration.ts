import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { GeneratedContentPlugin } from "./plugins/generatedContentPlugin";

export const ckeditorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, GeneratedContentPlugin],
  toolbar: ["bold", "italic"],
};
