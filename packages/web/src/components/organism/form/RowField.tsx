interface RowFieldProps {
    children: React.ReactNode;
}

export function RowField(props: RowFieldProps) {
    return (
        <div className="flex flex-row gap-2 flex-wrap items-center justify-between">
            {props.children}
        </div>
    );
}
