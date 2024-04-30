import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerAddressChanged from "../customer-address-changed.event";
import EnviaConsoleLogHandler from "./on-customer-address-changed";

describe("OnCustomerAddressChange unit tests", () => {
  const sut = new EnviaConsoleLogHandler();
  const evtDispatcher = new EventDispatcher();

  it("should be called when customer address changed event is fired", () => {
    // Arrange
    const spy = jest.spyOn(sut, "handle");
    evtDispatcher.register("CustomerAddressChanged", sut);

    const evt = new CustomerAddressChanged({
      address: {
        number: 123,
        city: "San Francisco",
        street: "San Francisco",
        zipcode: "123",
      },
      customer: {
        id: "123",
        name: "Customer 1",
      },
    });
    evtDispatcher.notify(evt);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(evt);
  });
});
