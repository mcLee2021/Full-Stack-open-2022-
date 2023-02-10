const Notification = ({ message }) => {
  console.log(message);
  if (message === null) return null;
  return message.includes("failed") ? (
    <div className="error-message">{message}</div>
  ) : (
    <div className="success-message">{message}</div>
  );
};

export default Notification;
