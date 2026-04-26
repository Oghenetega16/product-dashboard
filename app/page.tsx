import DashboardLayout from '@/components/DashboardLayout';
import ProductTable from '@/components/ProductTable';

export default function Home() {
    return (
        <DashboardLayout>
            <ProductTable />
        </DashboardLayout>
    );
}