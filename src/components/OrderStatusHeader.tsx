import { Order } from "@/types"
import { Progress } from "./ui/progress"
import { ORDER_STATUS } from "@/config/order-status-config"
import { get } from "http"

 type Props = {
    order: Order
 }
function OrderStatusHeader({order}: Props) {
    const getExpectedDelivery = () =>{
        const created = new Date(order.createdAt)

        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime)   

        const hours = created.getHours();
        const minutes = created.getMinutes()    

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`
    }


    const getStatusInfo = () =>{
        return ORDER_STATUS.find((ord)=> ord.value === order.status)  || ORDER_STATUS[0]
    }

  return (
   <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>
            Order Status: {getStatusInfo().label}
        </span>
        <span>
            Expected by: {getExpectedDelivery()}
        </span>
      </h1>

      <Progress className="animate-pulse"  value={getStatusInfo().progressValue}>


      </Progress>
   </>
  )
}

export default OrderStatusHeader
