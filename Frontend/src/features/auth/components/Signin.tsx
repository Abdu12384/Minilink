"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { bgIcons } from "@/utils/icons/bg.Icons"
import { useSignupMutation } from "../hooks/AuthCustomHook"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const  SignupMutation = useSignupMutation()
  let navigate = useNavigate()

  const signupSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
      .required("Phone number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      SignupMutation.mutate(
        values,
        {
          onSuccess: (data) => {
            console.log(data)
            toast.success(data.message)
            setTimeout(() => {
              navigate("/login")
            }, 2000)
          },
          onError: (error) => {
            toast.error(error.message)
          }
        }
      )
    },
  })



  const formFields = [
    { name: "name", type: "text", placeholder: "Enter your full name", Icon: User, label: "Full Name" },
    { name: "email", type: "email", placeholder: "Enter your email", Icon: Mail, label: "Email Address" },
    { name: "phone", type: "tel", placeholder: "Enter your phone number", Icon: Phone, label: "Phone Number" },
    {
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Create a password",
      Icon: Lock,
      label: "Password",
      hasToggle: true,
      toggleState: showPassword,
      setToggle: setShowPassword,
    },
    {
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm your password",
      Icon: Lock,
      label: "Confirm Password",
      hasToggle: true,
      toggleState: showConfirmPassword,
      setToggle: setShowConfirmPassword,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgIcons.map(({ Icon, className, duration, rotate, x, y, textClass, sizeClass }, index) => (
          <motion.div
            key={index}
            animate={{
              rotate: rotate,
              x: x,
              y: y,
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className={`absolute opacity-5 ${className}`}
          >
            <Icon className={`${textClass} ${sizeClass}`} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4"
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-400">Join us today and get started</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {formFields.map(({ name, type, placeholder, Icon, label, hasToggle, toggleState, setToggle }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor={name} className="text-gray-300">
                    {label}
                  </Label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={formik.values[name as keyof typeof formik.values]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${hasToggle ? "pl-10 pr-10" : "pl-10"} bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 ${formik.touched[name as keyof typeof formik.touched] && formik.errors[name as keyof typeof formik.errors] ? "border-red-500" : ""}`}
                      required
                    />
                    {hasToggle && setToggle && (
                      <button
                        type="button"
                        onClick={() => setToggle(!toggleState)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {toggleState ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    )}
                  </div>
                  {formik.touched[name as keyof typeof formik.touched] &&
                    formik.errors[name as keyof typeof formik.errors] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {formik.errors[name as keyof typeof formik.errors] as string}
                      </motion.p>
                    )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="flex items-center justify-center">
                    {formik.isSubmitting && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    {formik.isSubmitting ? "Creating Account..." : "Create Account"}
                    {!formik.isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </div>
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
