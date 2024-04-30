import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChanged from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface {
  handle(event: CustomerAddressChanged): void {
    console.log(
      `Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para 
      ${event.eventData.address.number} ${event.eventData.address.street}, 
      ${event.eventData.address.city}, ${event.eventData.address.zipcode}`
    );
  }
}
