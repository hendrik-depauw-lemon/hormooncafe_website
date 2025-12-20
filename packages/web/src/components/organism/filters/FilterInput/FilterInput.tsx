import { FilterModel, FilterOperation, FilterType } from '../filter-model';
import { FilterNotSupported } from '../FilterNotSupported';
import { BooleanInput } from './BooleanInput';
import { DateInput } from './DateInput';
import { DateRangeInput } from './DateRangeInput';
import { EnumInput } from './EnumInput';
import { EnumListInput } from './EnumListInput';
import { NumberInput } from './NumberInput';
import { NumberListInput } from './NumberListInput';
import { StringInput } from './StringInput';
import { StringListInput } from './StringListInput';

export type FilterInputProps = {
    filterModel: FilterModel;
    filterOperation: FilterOperation;
    value: unknown;
    onChange: (value: unknown, displayValue?: string) => void;
    onFinished: () => void;
};

export function FilterInput({
    filterModel,
    filterOperation,
    value,
    onChange,
    onFinished,
}: FilterInputProps) {
    if (filterModel.type === FilterType.string) {
        switch (filterOperation) {
            case FilterOperation.beginsWith:
            case FilterOperation.contains:
            case FilterOperation.eq:
            case FilterOperation.ne:
            case FilterOperation.regex:
                return <StringInput value={value} onChange={onChange} onFinished={onFinished} />;
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            case FilterOperation.in:
                return (
                    <StringListInput value={value} onChange={onChange} onFinished={onFinished} />
                );
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.number) {
        switch (filterOperation) {
            case FilterOperation.eq:
            case FilterOperation.ne:
            case FilterOperation.gt:
            case FilterOperation.gte:
            case FilterOperation.lt:
            case FilterOperation.lte:
                return <NumberInput value={value} onChange={onChange} onFinished={onFinished} />;
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            case FilterOperation.in:
                return (
                    <NumberListInput value={value} onChange={onChange} onFinished={onFinished} />
                );
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.date) {
        switch (filterOperation) {
            case FilterOperation.eq:
            case FilterOperation.ne:
            case FilterOperation.gt:
            case FilterOperation.gte:
            case FilterOperation.lt:
            case FilterOperation.lte:
                return <DateInput value={value} onChange={onChange} onFinished={onFinished} />;
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            case FilterOperation.between:
                return <DateRangeInput value={value} onChange={onChange} onFinished={onFinished} />;
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.boolean) {
        switch (filterOperation) {
            case FilterOperation.eq:
            case FilterOperation.ne:
                return <BooleanInput value={value} onChange={onChange} onFinished={onFinished} />;
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.enum) {
        switch (filterOperation) {
            case FilterOperation.eq:
            case FilterOperation.ne:
                return (
                    <EnumInput
                        filterModel={filterModel}
                        value={value}
                        onChange={onChange}
                        onFinished={onFinished}
                    />
                );
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            case FilterOperation.in:
                return (
                    <EnumListInput
                        filterModel={filterModel}
                        value={value}
                        onChange={onChange}
                        onFinished={onFinished}
                    />
                );
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.string_array) {
        switch (filterOperation) {
            case FilterOperation.includes:
                return <StringInput value={value} onChange={onChange} onFinished={onFinished} />;
            case FilterOperation.includesSome:
            case FilterOperation.includesAll:
                return (
                    <StringListInput value={value} onChange={onChange} onFinished={onFinished} />
                );
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            default:
                return <FilterNotSupported />;
        }
    } else if (filterModel.type === FilterType.enum_array) {
        switch (filterOperation) {
            case FilterOperation.includes:
                return (
                    <EnumInput
                        filterModel={filterModel}
                        value={value}
                        onChange={onChange}
                        onFinished={onFinished}
                    />
                );
            case FilterOperation.includesSome:
            case FilterOperation.includesAll:
                return (
                    <EnumListInput
                        filterModel={filterModel}
                        value={value}
                        onChange={onChange}
                        onFinished={onFinished}
                    />
                );
            case FilterOperation.isEmpty:
            case FilterOperation.isNotEmpty:
                return <></>;
            default:
                return <FilterNotSupported />;
        }
    } else {
        return <FilterNotSupported />;
    }
}
