import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userChange } from "../store/features/userInfo";

export default function RegisterationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      userChange({
        clientId: data.clientId,
        clientAge: data.clientAge,
        meetingDate: data.meetingDate,
      })
    );
    if (data.clientAge >= 60) {
      navigate('/screen3')
    } else {
      navigate(`/screen2`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-[400px] mt-10"
    >
      <div className="flex w-[400px] justify-between">
        <label className="text-xl font-medium" htmlFor="clientId">
          Client ID #
        </label>
        <div>
          <input
            type="number"
            {...register("clientId", {
              required: true && "Please write your ID*",
            })}
            className="border border-green-500 w-[180px] p-1 rounded-md"
          />
          {errors.clientId && (
            <span className="block text-xs leading-5 text-red-500">
              {errors.clientId.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-[400px] justify-between pt-8">
        <label className="text-xl font-medium" htmlFor="clientAge">
          Client Age
        </label>
        <div>
          <input
            type="number"
            {...register("clientAge", {
              required: true && "Please write your Age*",
            })}
            className="border border-green-500 w-[180px] p-1 rounded-md"
          />
          {errors.clientAge && (
            <span className="block text-xs leading-5 text-red-500">
              {errors.clientAge.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-[400px] justify-between pt-8">
        <label className="text-xl font-medium" htmlFor="meetingDate">
          Meeting date
        </label>
        <div>
          <input
            type="date"
            {...register("meetingDate", {
              required: true && "Please select a date*",
            })}
            className="border border-green-500 w-[180px] p-1 rounded-md"
          />
          {errors.meetingDate && (
            <span className="block text-xs leading-5 text-red-500">
              {errors.meetingDate.message}
            </span>
          )}
        </div>
      </div>
      <button className="flex justify-center mt-10 w-full max-w-[250px] bg-green-500 text-xl font-medium py-2 rounded-md text-white mx-auto">
        COMMENCE ACTIVITY
      </button>
    </form>
  );
}
