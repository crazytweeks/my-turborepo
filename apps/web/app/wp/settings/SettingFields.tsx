"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IWpConfig, wpConfigZodSchema } from "@repo/api/models";
import { SubmitHandler, useForm } from "react-hook-form";

import CButton from "../../../components/custom/CButton";
import CLoadingButton from "../../../components/custom/CLoadingButton";
import ControlInput from "../../../components/form/InputControl";
import trpc from "../../../lib/trpc";

const defaultValues: IWpConfig = {
  version: "v18.0",
  businessId: "",
  phoneNumberId: "",
  userAccessToken: "",
  phoneNumber: "",
};

const SettingFields = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IWpConfig>({
    resolver: zodResolver(wpConfigZodSchema),
    defaultValues,
    reValidateMode: "onChange",
    resetOptions: {
      keepDefaultValues: false,
      keepValues: false,
    },
  });

  const { mutateAsync, isLoading: postingData } =
    trpc.wp.config.updateConfig.useMutation();

  const { data, isLoading: fetchingData } =
    trpc.wp.config.getAllConfigs.useQuery(null);

  const onSubmit: SubmitHandler<IWpConfig> = (data) => {
    mutateAsync(data, {
      onSuccess: () => {
        alert("Success");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      reset({
        version: data[0].version,
        businessId: data[0].businessId,
        phoneNumberId: data[0].phoneNumberId,
        userAccessToken: data[0].userAccessToken,
        phoneNumber: data[0].phoneNumber,
      });
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        elevation={2}
        sx={{
          padding: 2,
        }}
      >
        <CardHeader title="Settings" />
        <Grid container>
          <ControlInput<IWpConfig>
            name={"businessId"}
            type={"number"}
            control={control}
            required={true}
          />
          <ControlInput<IWpConfig>
            name={"phoneNumberId"}
            type={"number"}
            control={control}
            required={true}
          />
          <ControlInput<IWpConfig>
            name={"userAccessToken"}
            required={true}
            control={control}
          />
          <ControlInput<IWpConfig>
            name={"version"}
            required={true}
            control={control}
          />

          <ControlInput<IWpConfig>
            name={"phoneNumber"}
            required={true}
            control={control}
          />

          <CardActions
            sx={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption" sx={{ color: "warning.light" }}>
              {errors && !isValid && "Please fill out all required fields."}
            </Typography>
            <ButtonGroup variant="text" size="small">
              <CButton
                onClick={() => reset(defaultValues)}
                variant="outlined"
                color={"warning"}
                startIcon={<RestartAltIcon />}
              >
                Reset
              </CButton>
              <CLoadingButton
                color={"primary"}
                type="submit"
                startIcon={<SaveIcon />}
                loading={postingData || fetchingData}
                disabled={postingData || fetchingData}
              >
                Submit
              </CLoadingButton>
            </ButtonGroup>
          </CardActions>
        </Grid>
      </Card>
    </form>
  );
};

export default SettingFields;
