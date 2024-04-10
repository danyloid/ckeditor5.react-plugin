import { Plugin } from "@ckeditor/ckeditor5-core";
import {
  Element,
  DowncastWriter,
  Item,
  RootElement,
  Selection,
  Range,
} from "@ckeditor/ckeditor5-engine";
import {
  Widget,
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget";

export const GeneratedContentPluginConfig = {
  className: "generated",
};

export class GeneratedContent extends Plugin {
  static get requires() {
    return [GeneratedContentEditor];
  }
}

export class GeneratedContentEditor extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass(GeneratedContentPluginConfig.className)
      )
    );

    this.editor.model.document.on("change", (e) => {
      const { model } = this.editor;

      const { source } = e;
      const { selection } = source as {
        roots: Set<RootElement>;
        selection: Selection;
      };

      if (!selection) return;

      const currentRoot = selection.anchor?.root;
      if (!currentRoot) return;

      const firstParagraph = Array.from(
        currentRoot.getChildren()
      )[0] as Element | null;

      if (!firstParagraph) return;

      const children = Array.from(firstParagraph.getChildren()) as Item[];
      const match = children.find(
        (child) =>
          "name" in child &&
          child.name === GeneratedContentPluginConfig.className
      );

      if (!match) return;

      const beforePlaceholderPosition = model.createPositionBefore(match);
      const afterPlaceholderPosition = model.createPositionAfter(match);

      const placeholderRange = model.createRange(
        beforePlaceholderPosition,
        afterPlaceholderPosition
      );

      const selectionRanges = Array.from(selection.getRanges()) as Range[];
      const selectionStart = selection.getFirstPosition();
      const selectionEnd = selection.getLastPosition();

      console.log(selectionStart?.nodeAfter);
      if (
        selection.isCollapsed &&
        selectionStart?.nodeAfter &&
        "name" in selectionStart.nodeAfter &&
        selectionStart.nodeAfter.name === GeneratedContentPluginConfig.className
      ) {
        console.log("updating selection to move cursor readonly widget");
        model.change((writer) => {
          const newRange = model.createRange(afterPlaceholderPosition);
          writer.setSelection(newRange);
        });
        return;
      }

      const intersects = selectionRanges.some((range) =>
        range.getIntersection(placeholderRange)
      );

      if (intersects) {
        console.log("updating selection to exclude readonly widget");
        model.change((writer) => {
          const newRange = model.createRange(
            afterPlaceholderPosition,
            selectionEnd ?? undefined
          );
          writer.setSelection(newRange);
        });
      }
    });
  }

  _createView = (modelItem: Element, viewWriter: DowncastWriter) => {
    const content = modelItem.getAttribute("content") as string;
    const title = modelItem.getAttribute("title") as string;
    const style = modelItem.getAttribute("style") as string;

    const placeholderView = viewWriter.createContainerElement("span", {
      class: GeneratedContentPluginConfig.className,
      title,
      style,
    });

    const innerText = viewWriter.createText(content ?? "");
    viewWriter.insert(
      viewWriter.createPositionAt(placeholderView, 0),
      innerText
    );

    return placeholderView;
  };

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(GeneratedContentPluginConfig.className, {
      inheritAllFrom: "$inlineObject",
      allowAttributes: ["title", "contenteditable"],
      isSelectable: false,
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      view: {
        name: "span",
        classes: ["generated"],
      },
      model: (viewElement, { writer: modelWriter }) => {
        if (!viewElement) return null;
        const textNodeChild = viewElement?.getChild(0);
        const content =
          textNodeChild && "data" in textNodeChild ? textNodeChild.data : "";
        const title = viewElement.getAttribute("title");
        const editable = viewElement.getAttribute("contenteditable");
        const styleNames = viewElement.getStyleNames();

        const style = Array.from(styleNames).reduce((acc, property) => {
          if (!property) return acc;
          const value = viewElement.getStyle(property);
          const keyValue = `${property}:${value};`;
          return acc + keyValue;
        }, "");

        console.log({ content, title, editable, style });

        return modelWriter.createElement("generated", {
          title,
          content,
          editable,
          style,
        });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: GeneratedContentPluginConfig.className,
      view: (modelItem, { writer: viewWriter }) => {
        const widgetElement = this._createView(modelItem, viewWriter);

        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: GeneratedContentPluginConfig.className,
      view: (modelItem, { writer: viewWriter }) =>
        this._createView(modelItem, viewWriter),
    });
  }
}
