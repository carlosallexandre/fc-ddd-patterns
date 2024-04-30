import EventInterface from "../../@shared/event/event.interface";

interface EventData {
  customer: { id: string; name: string };
  address: { number: number; street: string; city: string; zipcode: string };
}

export default class CustomerAddressChanged implements EventInterface {
  dataTimeOccurred: Date;
  eventData: EventData;

  constructor(data: EventData) {
    this.eventData = data;
    this.dataTimeOccurred = new Date();
  }
}
