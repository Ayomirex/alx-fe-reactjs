import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 chars")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setErrors }) => {
    console.log("Formik Form Submitted:", values);

    // Example custom error to trigger setErrors usage
    if (values.username === "taken") {
      setErrors({ username: "This username is already taken" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Formik Registration</h2>

          <div className="mb-3">
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-3">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-3">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
