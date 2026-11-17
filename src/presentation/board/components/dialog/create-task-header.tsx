import { DialogHeader, DialogTitle } from "../../../ui/dialog"
import { CreateTaskDescription } from "./create-task-description"

export function CreateTaskHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl">완성도를 높이는 작은 확인.</DialogTitle>
      <CreateTaskDescription />
    </DialogHeader>
  )
}
