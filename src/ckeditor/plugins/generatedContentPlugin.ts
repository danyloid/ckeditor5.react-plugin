import { Editor, Plugin } from "@ckeditor/ckeditor5-core";
import type { DowncastWriter } from "@ckeditor/ckeditor5-engine";
import {
  Widget,
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget";

const generatedInlineWidgetName = "generated";

function defineSchema(editor: Editor) {
  const { schema } = editor.model;

  schema.register(generatedInlineWidgetName, {
    inheritAllFrom: "$inlineObject",
    allowChildren: "$text",
  });
}

function defineConverters(editor: Editor) {
  const { conversion } = editor;

  function createGeneratedContentView(
    _modelItem: unknown,
    viewWriter: DowncastWriter
  ) {
    const generatedContentView = viewWriter.createContainerElement("span", {
      class: generatedInlineWidgetName,
    });

    console.log("createGeneratedContentView", generatedContentView);

    return generatedContentView;
  }

  conversion.for("upcast").elementToElement({
    view: {
      name: "span",
      classes: [generatedInlineWidgetName],
    },
    model: (viewElement, { writer: modelWriter }) => {
      const node = viewElement.getChild(0);
      const content = node && "data" in node ? node.data : "";
      return modelWriter.createElement(generatedInlineWidgetName, {
        name: content,
      });
    },
  });

  conversion.for("editingDowncast").elementToElement({
    model: generatedInlineWidgetName,
    view: (modelItem, { writer: viewWriter }) => {
      return toWidget(
        createGeneratedContentView(modelItem, viewWriter),
        viewWriter
      );
    },
  });

  conversion.for("dataDowncast").elementToElement({
    model: generatedInlineWidgetName,
    view: (modelItem, { writer: viewWriter }) => {
      createGeneratedContentView(modelItem, viewWriter);
    },
  });
}

export const GeneratedContentPluginConfig = {
  className: "generated",
};

export class GeneratedContentPlugin extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    const editor = this.editor;
    defineSchema(editor);
    defineConverters(editor);

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(
        this.editor.model,
        (viewElement) => {
          console.log("viewToModelPosition", viewElement);
          return viewElement.hasClass(GeneratedContentPluginConfig.className);
        }
      )
    );
  }
}
