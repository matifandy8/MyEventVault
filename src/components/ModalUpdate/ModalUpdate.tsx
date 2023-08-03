"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/database.types";

type FormValues = {
  name: string;
  description: string;
  date: string;
  image: any;
};

const validationSchema: any = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  date: yup.string().required("Date is required"),
});

export default function Modal({ userId }: any) {
  const supabase = createClientComponentClient<Database>();
  const [showModal, setShowModal] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
  const onSubmitHandler = async (formData: FormValues) => {
    console.log(formData);
    try {
      const { data, error } = await supabase.from("events").insert({
        name: formData.name,
        description: formData.description,
        date: formData.date,
        image: formData.image,
        user_id: userId,
      });

      if (error) {
        console.error("Error Updating data:", error);
      } else {
        console.log("Data Updated successfully:", data);
        setIsUpdateSuccessful(true);
      }
    } catch (error: any) {
      console.error("Error saving data:", error.message);
    }
    reset();
  };

  return (
    <>
      <button
        className="rounded-md bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 max-w-7xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Event</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    className="flex flex-col gap-2 rounded-lg p-8 text-neutral-900 "
                    onSubmit={handleSubmit(onSubmitHandler)}
                  >
                    <label htmlFor="name" className="text-left">
                      Name
                    </label>
                    <input
                      className="rounded border border-neutral-200 bg-neutral-50 p-1"
                      type="text"
                      id="name"
                      placeholder="Name of Event"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative"
                        role="alert"
                      >
                        {errors.name.message}
                      </div>
                    )}

                    <label htmlFor="card-number" className="text-left">
                      Description
                    </label>
                    <input
                      className="rounded border border-neutral-200 bg-neutral-50 p-1"
                      type="text"
                      id="description"
                      placeholder="Description of Event"
                      {...register("description")}
                    />
                    {errors?.description && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative"
                        role="alert"
                      >
                        {errors.description.message}
                      </div>
                    )}
                    <label htmlFor="date" className="text-left">
                      Date
                    </label>
                    <input
                      className="rounded border border-neutral-200 bg-neutral-50 p-1"
                      type="date"
                      id="date"
                      placeholder="dd / mm / yy"
                      {...register("date")}
                    />
                    {errors?.date && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative"
                        role="alert"
                      >
                        {errors.date.message}
                      </div>
                    )}
                    <label htmlFor="image" className="text-left">
                      Image
                    </label>
                    <input
                      className="rounded border border-neutral-200 bg-neutral-50 p-1"
                      type="text"
                      id="image"
                      placeholder="https://www.example.png"
                      {...register("image")}
                    />
                    <button className="mt-5 rounded bg-green-500 p-2 text-neutral-50    ">
                      Update Event
                    </button>
                  </form>
                  {isUpdateSuccessful && (
                    <div className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                      Event was successfully Update!
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
