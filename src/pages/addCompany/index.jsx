import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/form-elements/inputField";
import RadioGroup from "../../components/form-elements/radioGroup";

// Validation schema using Yup
const validationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  adminName: Yup.string().required("Admin name is required"),
  adminEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  planType: Yup.string().required("Plan type is required"),
  planCount: Yup.number()
    .min(1, "Plan count must be at least 1")
    .required("Plan count is required"),
  subscribers: Yup.number()
    .min(0, "Subscribers cannot be negative")
    .required("Number of subscribers is required"),
  videosPerSubscriber: Yup.number()
    .min(0, "Videos per subscriber cannot be negative")
    .required("Videos per subscriber is required"),
});

const AddCompany = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="">
        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add Company</h2>

            <Formik
              initialValues={{
                companyName: "",
                adminName: "",
                adminEmail: "",
                planType: "monthly",
                planCount: 1,
                subscribers: 0,
                videosPerSubscriber: 0,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form submitted:", values);
                alert("Company Added!");
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <InputField
                        label="Company Name"
                        type="text"
                        name="companyName"
                        placeholder="Enter Your Company Name"
                        className="bg-blue-50"
                      />
                    </div>

                    {/* Primary Admin Name */}
                    <div>
                      <InputField
                        label="Primary Admin Name"
                        type="text"
                        name="adminName"
                        placeholder="Enter Your Primary Admin Name"
                        className="bg-blue-50"
                      />
                    </div>

                    {/* Primary Admin Email */}
                    <div>
                      <InputField
                        label="Primary Admin Email"
                        type="email"
                        name="adminEmail"
                        placeholder="Enter Your Primary Admin Email"
                        className="bg-blue-50"
                      />
                    </div>

                    {/* Plan Type */}
                    <div>
                      <RadioGroup
                        label="Plan Type Monthly/Annual"
                        name="planType"
                        options={[
                          { label: "Monthly", value: "monthly" },
                          { label: "Annual", value: "annual" },
                        ]}
                      />
                    </div>

                    {/* Plan Count */}
                    <div>
                      <InputField
                        label="Plan Count"
                        type="number"
                        name="planCount"
                        className="bg-blue-50"
                      />
                    </div>

                    {/* Subscribers/Tokens */}
                    <div>
                      <InputField
                        label="No. Of Subscribers/Tokens"
                        type="number"
                        name="subscribers"
                        className="bg-blue-50"
                      />
                    </div>

                    {/* Videos Per Subscriber */}
                    <div>
                      <InputField
                        label="Videos Per Subscribers"
                        type="number"
                        name="videosPerSubscriber"
                        className="bg-blue-50"
                      />
                    </div>
                  </div>

                  {/* Add Company button */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-gray-800 text-white px-4 py-2 rounded flex items-center"
                    >
                      ADD COMPANY <span className="ml-2">+</span>
                    </button>
                  </div>
                  <div className="flex justify-end mt-10">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded">
                      SUBMIT +
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Submit button at bottom right */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
