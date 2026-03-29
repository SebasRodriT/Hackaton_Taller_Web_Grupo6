"use client";

import { useState } from "react";

type FormData = {
  username: string;
  fullName: string;
  age: string;
};

type Errors = {
  username?: string;
  fullName?: string;
  age?: string;
};

export default function Formulario() {
  const [form, setForm] = useState<FormData>({
    username: "",
    fullName: "",
    age: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validate = (): Errors => {
    const newErrors: Errors = {};

    if (!form.username.trim()) {
      newErrors.username = "El username es obligatorio.";
    } else if (form.username.trim().length < 6) {
      newErrors.username = "Debe tener al menos 6 caracteres.";
    }

    if (!form.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio.";
    } else if (form.fullName.trim().length < 6) {
      newErrors.fullName = "Debe tener al menos 6 caracteres.";
    }

    if (!form.age.trim()) {
      newErrors.age = "La edad es obligatoria.";
    } else if (!/^\d+$/.test(form.age)) {
      newErrors.age = "Debe ser un número válido.";
    } else if (Number(form.age) <= 0) {
      newErrors.age = "Debe ser mayor a 0.";
    }

    return newErrors;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const processedData = {
        username: form.username.toUpperCase(),
        fullName: form.fullName.toUpperCase(),
        age: form.age,
      };

      setSubmittedData(processedData);
    }
  };

  return (
    <section className="w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-center text-3xl font-semibold text-slate-900">
        Formulario
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              FullName
            </label>
            <input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Age</label>
            <input
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-2 rounded bg-slate-900 px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col justify-center">
          {submittedData && (
            <ul className="mt-4 list-disc pl-5 text-slate-700">
              <li>
                <strong>UserName:</strong> {submittedData.username}
              </li>
              <li>
                <strong>FullName:</strong> {submittedData.fullName}
              </li>
              <li>
                <strong>Age:</strong> {submittedData.age}
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
