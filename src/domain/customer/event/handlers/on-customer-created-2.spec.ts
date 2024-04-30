import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog2Handler from "./on-customer-created-2";

describe("OnCustomerCreated2 unit tests", () => {
  const sut = new EnviaConsoleLog2Handler();
  const evtDispatcher = new EventDispatcher();

  it("should be called when customer created event is fired", () => {
    // Arrange
    const spy = jest.spyOn(sut, "handle");
    evtDispatcher.register(CustomerCreatedEvent.name, sut);

    const evt = new CustomerCreatedEvent();
    evtDispatcher.notify(evt);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(evt);
  });
});
