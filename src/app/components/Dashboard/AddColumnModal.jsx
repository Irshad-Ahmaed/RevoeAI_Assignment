import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddColumnModal({ onAddColumn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState('text');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const column = {
      name: columnName,
      type: columnType,
      ...(columnType === 'date' && { defaultValue: selectedDate }), // Include date if type is 'date'
    };
    onAddColumn(column);
    setIsOpen(false);
    setColumnName('');
    setColumnType('text');
    setSelectedDate(new Date());
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="text-white h-10 cursor-pointer rounded hover:bg-gray-800 duration-200 transition-all"
      >
        Add Column
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Column</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="columnName" className="text-right">
                  Column Name
                </Label>
                <Input
                  id="columnName"
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="columnType" className="text-right">
                  Column Type
                </Label>
                <Select value={columnType} onValueChange={setColumnType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {columnType === 'date' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="datePicker" className="text-right">
                    Default Date
                  </Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="col-span-3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    wrapperClassName="w-full"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Column</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}