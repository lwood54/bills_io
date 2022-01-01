import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/avatar";
import Button from "../../components/Base/Button/button";
import FormInput from "../../components/Base/FormInput/form-input";
import Text from "../../components/Base/Text/text";
import CloseIcon from "../../components/Icons/close-icon";
import EditIcon from "../../components/Icons/edit-icon";
import { VALIDATION } from "../../constants/validation";
import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../supabase";

interface ProfileState {
  username: string;
  website: string;
  avatar_url: string;
  id: string;
}
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    getValues,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileState>({
    defaultValues: {
      username: "",
      website: "",
      avatar_url: "",
      id: user?.id,
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  async function getProfile() {
    try {
      setIsLoading(true);
      console.log("user", user);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      console.log("data", data);
      if (data) {
        reset({
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
          id: user?.id,
        });
      } else {
        console.log("no data here");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleUpdateProfile: SubmitHandler<ProfileState> = async (data) => {
    console.log("payload data: ", data);
    try {
      setIsLoading(true);
      const updates = {
        ...data,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error updating profile", error);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="w-full flex justify-center flex-wrap p-4">
            <div
              className="flex justify-end cursor-pointer w-full"
              onClick={() => setIsEdit(!isEdit)}
            >
              {!isEdit ? <EditIcon /> : <CloseIcon />}
            </div>
            <div className="m-4">
              <Avatar
                url={getValues("avatar_url")}
                size={150}
                onUpload={(url) => {
                  setValue("avatar_url", url);
                  handleUpdateProfile(getValues());
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2 max-w-xl mt-4 justify-center">
              {user?.email && (
                <Text className="w-full pb-2" as="h3">
                  {user.email}
                </Text>
              )}
              {isEdit ? (
                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                  <FormInput
                    id="username"
                    {...register("username", {
                      required: VALIDATION.REQUIRED,
                    })}
                    error={errors?.username?.message}
                    label="Username"
                  />
                  <FormInput
                    id="website"
                    {...register("website")}
                    label="Website"
                  />
                  <Button
                    customClass="w-96 mt-[24px] h-[49px]"
                    label="Update"
                    type="submit"
                  />
                </form>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Text className="w-full" as="h4">
                    {getValues("username")}
                  </Text>
                  <a
                    className="w-full rounded-full active:bg-emerald-400 hover:bg-sky-200 flex justify-center items-center"
                    href={getValues("website")}
                    target="_blank"
                  >
                    {getValues("website")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
