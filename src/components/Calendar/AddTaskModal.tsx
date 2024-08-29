import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { mixed, object, string } from "yup";
import { TaskForm } from "./TaskForm";
import { formValues } from "./types";
import { useAddTaskMutation } from "@/redux/services/task.api";
import { toast } from "../shared";

export interface TaskModalProps {
    onClose: () => void;
    isOpen: boolean
}

export const TaskFormValidation = object().shape({
    name: string().required(),
    description: string().required(),
    deadline: string().required(),
    time: string().required(),
    priority: string().required(),
    file: mixed()
})


export const AddTaskModal = ({ isOpen, onClose }: TaskModalProps) => {
    const [addTask, { isLoading }] = useAddTaskMutation()

    const handleSubmit = (values: formValues, formHelpers: FormikHelpers<formValues>) => {
        addTask(values).unwrap().then(() => {
            toast({
                status: "success",
                title: "Operation Successful",
                description: "New Task has been added!!"
            })
            onClose()
            formHelpers.resetForm()
        }).catch(() => {
            toast({
                status: "error",
                title: "Operation Failed",
                description: "Failed to add new Task!!"
            })
        })
    }

    const formikHandler = useFormik<formValues>({
        initialValues: {
            name: "",
            description: "",
            priority: "",
            deadline: "",
            time: "",
            image: ""
        },
        validationSchema: TaskFormValidation,
        onSubmit: handleSubmit
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TaskForm formik={formikHandler} />
                </ModalBody>

                <ModalFooter>
                    <Button w={"full"} isLoading={isLoading} onClick={formikHandler.handleSubmit}>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
