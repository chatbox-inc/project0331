export class IssuesCollection {
  public items: any[];

  constructor(issues: any[]) {
    this.items = issues;
  }

  getAssignee(issue: any): any[] {
    // NOTE: Draft はデータ構造が異なるため
    if (!issue.content?.assignees) {
      return [
        {
          avatarUrl: 'assets/icons8-ghost-48.png',
          login: 'Draft Icon',
        },
      ];
    }
    return issue.content.assignees.nodes;
  }

  getDraftTitle(issue: any) {
    const result = issue.fieldValues.nodes.find(
      (node: any) => node.projectField.name === 'Title',
    ).value;
    return result;
  }

  open() {
    return this.items.filter((issue) => {
      return issue.content.state === 'OPEN';
    }).length;
  }

  close() {
    return this.items.filter((issue) => {
      return issue.content.state === 'CLOSED';
    }).length;
  }

  sumup(name: any) {
    let result = 0;
    for (const issue of this.items) {
      const sumupField = issue.fieldValues.nodes.find((r: any) => {
        return r.projectField.name === name;
      });
      if (sumupField) {
        result = result + parseInt(sumupField.value);
      }
    }
    return result;
  }
}
