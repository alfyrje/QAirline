import { useRecordContext } from 'react-admin';

const CustomReferenceField = ({ source, reference }: { source: string, reference: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  const relatedRecord = record[reference];
  return <span>{relatedRecord ? relatedRecord[source] : ''}</span>;
};

export default CustomReferenceField;