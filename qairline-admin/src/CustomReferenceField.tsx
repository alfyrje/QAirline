import { useRecordContext } from 'react-admin';

const CustomReferenceField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  return <span>{record[source] ? record[source] : ''}</span>;
};

export default CustomReferenceField;