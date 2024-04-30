import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.event";
import EnviaConsoleLog1Handler from "./on-customer-created-1";

describe("OnCustomerCreated1 unit tests", () => {
  const sut = new EnviaConsoleLog1Handler();
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
