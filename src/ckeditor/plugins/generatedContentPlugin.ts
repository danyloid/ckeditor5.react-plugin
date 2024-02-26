import type { Editor } from "@ckeditor/ckeditor5-core";
import type { DowncastWriter } from "@ckeditor/ckeditor5-engine";
import { toWidget } from "@ckeditor/ckeditor5-widget";

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
      return modelWriter.createElement(generatedInlineWidgetName, { content });
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

export function GeneratedContentPlugin(editor: Editor) {
  defineSchema(editor);
  defineConverters(editor);
}
