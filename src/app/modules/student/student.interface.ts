import { Model, Types } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type Guardian = {
  fathersName: string
  fatherOccupation: string
  fatherContactNo: string
  mothersName: string
  motherOccupation: string
  motherContactNo: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: UserName
  gender: 'Male' | 'Female'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
}

// static method
export interface StudentModel extends Model<TStudent> {
  isExistUser(id: string): Promise<TStudent | null>
}
