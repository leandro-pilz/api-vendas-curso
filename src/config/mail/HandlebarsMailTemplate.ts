import handlebars from 'handlebars';

interface ITemplateValiable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateValiable;
}

export default class HandlebarsMailTemplate {
  public async parse({ template, variables }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
