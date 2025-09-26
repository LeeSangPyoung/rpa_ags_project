import { StepExecutionPopupResponse } from "../../../types";

export type RPAResultLogProps = {
    isResultLogModalOpen: boolean,
    stepExecutionSelected: StepExecutionPopupResponse | undefined,
    setIsResultLogModalOpen:(value: boolean) => void,
    onCloseResultLogModal: () => void
}