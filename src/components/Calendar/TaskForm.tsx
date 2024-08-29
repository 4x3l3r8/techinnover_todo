import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, Textarea } from "@chakra-ui/react"
import { FormikProps } from "formik"
import { PriorityTagSelect } from "./PriorityTagSelect"
import { formValues } from "./types"
import { Dropzone } from "../shared"



export const TaskForm = ({ formik }: { formik: FormikProps<formValues> }) => {
    return (
        <Stack gap={4}>
            <FormControl isRequired isInvalid={formik.touched.name && Boolean(formik.errors.name)}>
                <FormLabel>
                    Task Name
                </FormLabel>
                <Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.description && Boolean(formik.errors.description)}>
                <FormLabel display={"flex"}>
                    Description <Text color={"gray.400"} fontWeight={"normal"} ml={1}>(Optional)</Text>
                </FormLabel>
                <Textarea resize={"none"} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <PriorityTagSelect formik={formik} />

            <FormControl isInvalid={formik.touched.image && Boolean(formik.errors.image)}>
                <FormLabel display={"flex"}>
                    Upload cover <Text color={"gray.400"} fontWeight={"normal"} ml={1}>(Optional)</Text>
                </FormLabel>
                <Dropzone onFileAccepted={(file) => formik.setFieldValue("image", file[0])} value={formik.values.image} type="image" />
                <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
            </FormControl>

            <Flex gap={4}>
                <FormControl isRequired isInvalid={formik.touched.deadline && Boolean(formik.errors.deadline)}>
                    <FormLabel>
                        Deadline
                    </FormLabel>
                    <Input type="date" id="deadline" name="deadline" onChange={formik.handleChange} value={formik.values.deadline} />
                    <FormErrorMessage>{formik.errors.deadline}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={formik.touched.time && Boolean(formik.errors.time)}>
                    <FormLabel>
                        Time
                    </FormLabel>
                    <Input type="time" id="time" name="time" onChange={formik.handleChange} value={formik.values.time} />
                    <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
                </FormControl>
            </Flex>
        </Stack >
    )
}
