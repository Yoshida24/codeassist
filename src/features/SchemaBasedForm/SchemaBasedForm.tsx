import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/chakra-ui";
import { JSONSchema7Definition } from "json-schema";
import { useRef } from "react";

function SchemaBasedForm(props: {
  schema: {
    [key: string]: JSONSchema7Definition;
  };
  // eslint-disable-next-line
  onSubmit?: any;
  // eslint-disable-next-line
  onChange: any;
  // eslint-disable-next-line
  formData: any;
}) {
  const schema: RJSFSchema = props.schema;
  const uiSchema: UiSchema = {
    "ui:submitButtonOptions": {
      norender: true,
    },
  };
  const editorParentRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line
  const onSubmit = (e: any) => {
    props.onChange(e);
  };

  // eslint-disable-next-line
  const onChange = (e: any) => {
    props.onChange(e);
  };

  return (
    <>
      <div ref={editorParentRef} />
      <div>
        <Form
          schema={schema}
          formData={props.formData}
          validator={validator}
          onChange={onChange}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
        />
      </div>
    </>
  );
}

export default SchemaBasedForm;
