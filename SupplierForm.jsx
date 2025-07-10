
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SupplierForm = () => {
  const formik = useFormik({
    initialValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      pan: "",
      gstin: "",
      entityType: "",
      panCard: null,
      gstCertificate: null,
      cancelledCheque: null,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      pan: Yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN").required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      await axios.post("http://localhost:5000/api/suppliers", formData);
      alert("Submitted successfully!");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input name="companyName" placeholder="Company Name" onChange={formik.handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={formik.handleChange} />
      <input name="pan" placeholder="PAN" onChange={formik.handleChange} />
      <input name="gstin" placeholder="GSTIN" onChange={formik.handleChange} />
      <select name="entityType" onChange={formik.handleChange}>
        <option value="">Entity Type</option>
        <option value="Pvt Ltd">Pvt Ltd</option>
        <option value="LLP">LLP</option>
        <option value="Proprietor">Proprietor</option>
      </select>
      <input name="panCard" type="file" onChange={(e) => formik.setFieldValue("panCard", e.currentTarget.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SupplierForm;
