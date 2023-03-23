import { Avatar, AvatarBadge, Box, Container, Divider, FormControl, Input, FormErrorMessage, FormLabel, SimpleGrid, Skeleton, Stack, Textarea, useDisclosure, useToast, VStack, HStack, Center } from '@chakra-ui/react';
import useStore from '../../store/store'
import {
  Card, CardBody, Text, Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select
} from '@chakra-ui/react'
import TableHr from './TableHr';
import { useForm } from 'react-hook-form';
import { addNewSick, getAllSicks, getEmployees, IApplicationData, IApplicationForm } from '../../utils/sdk';
import { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';

const DashboardHR = () => {

  // Store with user info
  const store = useStore();

  // States with Employees and Sick Application
  const [employees, setEmployees] = useState<any[]>([]);
  const [sickApplications, setSickApplication] = useState<IApplicationData[]>([]);
  // State to set skeleton
  const [loading, setLoading] = useState<boolean>(true);

  // react-hook-form Info
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IApplicationForm>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getData = async () => {
    setLoading(true);
    let sickAplicationsT: any[] = await getAllSicks();
    if (sickAplicationsT.length > 0) {
      setSickApplication(sickAplicationsT);
      setLoading(false);
    } else {
      toast({
        title: 'Error Getting Employees.',
        description: 'There is a error with firebase',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    }
  }

  // Clear Form Fields and closing modal
  const clearModal = () => {
    reset();
    onClose();
  }

  // useEffect to fill select with employees
  useEffect(() => {
    const fillSelect = async () => {
      let tempEmployee: any[] = await getEmployees();
      setEmployees(tempEmployee);
    }
    fillSelect();
  }, []);

  // useEffect to fill table
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(store.user?.email);
  })

  // onSubmit from Form
  const onSubmit = async (data: IApplicationForm) => {
    console.log(data);
    if (await addNewSick(data)) {
      toast({
        title: 'Sick Application created.',
        description: 'Your application was saved succefully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      getData();
    } else {
      toast({
        title: 'Sick Application Error.',
        description: 'There is a error saving your application',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
    clearModal();
  }

  return (
    <>
      <Container maxW='container.full'>
        <Card>
          <CardBody>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={10}>
              <Box>
                <VStack spacing={4} align={"flex-start"}>
                  <HStack>
                    <Avatar name={store.user.fullName} src='https://bit.ly/tioluwani-kolawole' >
                      <AvatarBadge boxSize='1.25em' bg='green.500' />
                    </Avatar>
                    <LogoutButton />
                  </HStack>
                  <Text fontSize={"sm"}>{store.user.fullName}</Text>
                </VStack>
              </Box>
              <Box textAlign={{ sm: "center", md: "end", lg: "end" }}>
                <Button colorScheme={"blue"} size={"lg"} onClick={onOpen}>New Application</Button>
              </Box>
            </SimpleGrid>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={clearModal} size={"6xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sick Leave Application</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={"15px"}>
                      <FormControl isInvalid={Boolean(errors.medicalUnit)}>
                        <FormLabel>
                          Medical Unit
                        </FormLabel>
                        <Select {...register("medicalUnit", {
                          required: 'Medical Unit is Required'
                        })}>
                          <option value="">....</option>
                          <option value="ISSS">ISSS</option>
                          <option value="MINSAL">MINSAL</option>
                        </Select>

                        {Boolean(errors.medicalUnit) && (
                          <FormErrorMessage>
                            {errors.medicalUnit?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.doctorName)}>
                        <FormLabel>
                          Doctor
                        </FormLabel>
                        <Input type='text' placeholder='Doctor'
                          {...register("doctorName", {
                            required: 'Doctor is Required'
                          })} />

                        {Boolean(errors.doctorName) && (
                          <FormErrorMessage>
                            {errors.doctorName?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.starDate)}>
                        <FormLabel>
                          Start Date
                        </FormLabel>
                        <Input type='date' placeholder='Start Date'
                          {...register("starDate", {
                            required: 'Start Date is Required'
                          })} />

                        {Boolean(errors.starDate) && (
                          <FormErrorMessage>
                            {errors.starDate?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.endDate)}>
                        <FormLabel>
                          End Date
                        </FormLabel>
                        <Input type='date' placeholder='End Date'
                          {...register("endDate", {
                            required: 'End Date is Required',
                            validate: (val: string) => {
                              let startDate = watch('starDate');
                              if (new Date(startDate).getTime() > new Date(val).getTime()) {
                                return "La fecha de finalizacion tiene que ser mayor a la de inicio";
                              }
                            },
                          })} />

                        {Boolean(errors.endDate) && (
                          <FormErrorMessage>
                            {errors.endDate?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.coverageDays)}>
                        <FormLabel>
                          Coverage Days
                        </FormLabel>
                        <Input type='number' placeholder='Coverage Days' min={1}
                          {...register("coverageDays", {
                            required: 'A valid number is Required'
                          })} />

                        {Boolean(errors.coverageDays) && (
                          <FormErrorMessage>
                            {errors.coverageDays?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>

                      <FormControl isInvalid={Boolean(errors.employeeId)}>
                        <FormLabel>
                          Employee
                        </FormLabel>
                        <Select {...register("employeeId", {
                          required: 'Select a Employee'
                        })}>
                          <option value="">...</option>
                          {employees.map((employee, i) => {
                            return (
                              <option key={i} value={employee.id}>{employee.fullName}</option>
                            )
                          })}
                        </Select>

                        {Boolean(errors.employeeId) && (
                          <FormErrorMessage>
                            {errors.employeeId?.message?.toString()}
                          </FormErrorMessage>
                        )}

                      </FormControl>
                    </SimpleGrid>
                    <FormControl mt={2} isInvalid={Boolean(errors.medicalDiagnostic)} width={"full"}>
                      <FormLabel textAlign={"center"}>
                        Medical Diagnostic
                      </FormLabel>
                      <Textarea placeholder='Medical Diagnostic' {...register("medicalDiagnostic", {
                        required: 'Medical Diagnostic is Required'
                      })} />

                      {Boolean(errors.medicalDiagnostic) && (
                        <FormErrorMessage>
                          {errors.medicalDiagnostic?.message?.toString()}
                        </FormErrorMessage>
                      )}

                    </FormControl>
                    <Button colorScheme='blue' mt={"5"} type='submit'>Submit Application</Button>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='teal' mr={3} onClick={clearModal}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardBody>
        </Card>
        <Divider />


        {/*We pass the sickApplications to the TableHr*/}
        {
          loading ? (
            <Stack mt={"10"}>
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
              <Skeleton height='20px' />
            </Stack>
          ) : (
            <TableHr data={sickApplications} />
          )
        }

      </Container>
    </>
  )
}

export default DashboardHR