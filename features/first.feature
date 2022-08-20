Feature: Booking tickets
    Scenario: Should booking one ticket to the first avaible seanses
        Given user go to first avaible seans
        When user click on one first avaible seat and submith
        Then the result should be "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."

    Scenario: Should booking two tickets to the first avaible seanes
        Given user go to first avaible seans
        When user click on first avaible seanses and check two avaible seat and submith
        Then the result should be "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."

    Scenario: User can not get ticket to the checked seat
        Given user go to first avaible seans
        When user click on first checked seat
        Then submit button in not avaible