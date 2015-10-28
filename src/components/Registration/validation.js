export default function validation(data) {
  const errors = {};
  if (!data.email) {
    errors.email = 'Required';
  }
  if (!data.password) {
    errors.password = 'Required';
  }
  const emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (data.email && !emailReg.test(data.email)) {
    errors.email = 'Please use valid email address';
  }
  if (data.password && data.password.length < 8) {
    errors.password = 'Passwords must be minimum 8 characters long';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please enter password again';
  }
  if (data.password && !errors.password) {
    if (!/^(?=.*[A-Z]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter (A-Z)';
    } else if (!/^(?=.*[0-9]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one number (0-9)';
    }
  }
  if (data.password && data.confirmPassword && data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords must be equal';
  }
  return errors;
}
