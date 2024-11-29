import { toast } from "react-toastify";

type TNotificationType = "success" | "error";

type TProps =  {
  title?: string;
  type: TNotificationType;
}

type TNotification = (props: TProps) => number | string | null;

export const notification: TNotification = ({
                                              title,
                                              type,
                                            }) => {
  const render = (type: TNotificationType) => {
    switch (type) {
      case "success":
        return renderSuccess();
      case "error":
        return renderError();
      default:
        return null;
    }
  }

  const renderContent = () => {
    return <div>{title}</div>;
  }

  const renderSuccess = () => {
    return toast.success(
      renderContent(),
      {
        position: "top-right"
      }
    );
  };

  const renderError = () => {
    return toast.error(
      renderContent(),
      {
        position: "top-right"
      }
    );
  };

  return render(type);
};