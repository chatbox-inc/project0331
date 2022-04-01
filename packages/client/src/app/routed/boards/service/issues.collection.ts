

export class IssuesCollection{

  public items: any[]


  constructor(issues: any[]) {
    this.items = issues;
  }

  getAsignee(issue:any):any[]{
    return issue.content.assignees.nodes
  }

  open(){
    return this.items.filter(issue=>{
      return issue.content.state === "OPEN"
    }).length
  }

  close(){
    return this.items.filter(issue=>{
      return issue.content.state === "CLOSED"
    }).length
  }

  sumup(name:any){
    let result = 0
    for(let issue of this.items){
      const sumupField = issue.fieldValues.nodes.find( (r:any)=>{
        return r.projectField.name === name
      })
      if(sumupField){
        result = result + parseInt(sumupField.value)
      }
    }
    return result
  }


}
