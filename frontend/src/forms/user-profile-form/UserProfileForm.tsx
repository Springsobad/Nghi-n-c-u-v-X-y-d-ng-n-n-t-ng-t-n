import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/type";
import { useEffect } from "react";
const formSchema  = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Bat buoc nhap ten"),
    addressLine1: z.string().min(1, "Bat buoc dia chi"),
    city: z.string().min(1, "Bat buoc nhap thanh pho"),
    country: z.string().min(1, "Bat buoc quoc gia")
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (UserProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
}

const UserProfileForm = ({onSave, isLoading, currentUser, title ="User Profile", buttonText ="Submit"}:Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    })
    useEffect(()=>{
        form.reset(currentUser);
    }, [currentUser,form])
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <FormDescription>
                    Thay doi thong tin ca nhan o day
                </FormDescription>
            </div>
            <FormField control={form.control} name ="email" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input {...field} value={field.value || ''} disabled className="bg-white"/>
                    </FormControl>
                </FormItem>
            )}/>
            
            <FormField control={form.control} name ="name" render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input {...field} value={field.value || ''} className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <div className="flex flex-col md:flex-row gap-4">
            <FormField control={form.control} name ="addressLine1" render={({field})=>(
                <FormItem className="flex-1">
                    <FormLabel>
                        Address
                    </FormLabel>
                    <FormControl>
                        <Input {...field} value={field.value || ''} className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

            <FormField control={form.control} name ="city" render={({field})=>(
                <FormItem className="flex-1">
                    <FormLabel>
                        City
                    </FormLabel>
                    <FormControl>
                        <Input {...field} value={field.value || ''} className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>

            <FormField control={form.control} name ="country" render={({field})=>(
                <FormItem className="flex-1">
                    <FormLabel>
                        Country
                    </FormLabel>
                    <FormControl>
                        <Input {...field} value={field.value || ''}  className="bg-white"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            </div>
            {isLoading? <LoadingButton/>: <Button type = "submit" className="bg-orange-500">{buttonText}</Button>}
        </form>
    </Form>
}

export default UserProfileForm;