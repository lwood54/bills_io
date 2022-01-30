export function dataToFormData<T>(data: T): FormData {
  const formData = new FormData();
  const entries = Object.entries(data);
  entries.forEach((d) => {
    formData.append(d[0], d[1]);
  });
  return formData;
}
