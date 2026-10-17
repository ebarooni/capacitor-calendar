package dev.barooni.capacitor.calendar.utils

import android.provider.CalendarContract
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class ImplementationHelperTest {
    @Test
    fun allowsContentModificationsFromContributorAccessUpwards() {
        assertEquals(true, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_CONTRIBUTOR))
        assertEquals(true, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_EDITOR))
        assertEquals(true, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_OWNER))
        assertEquals(true, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_ROOT))
    }

    @Test
    fun deniesContentModificationsBelowContributorAccess() {
        assertEquals(false, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_NONE))
        assertEquals(false, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_FREEBUSY))
        assertEquals(false, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_READ))
        assertEquals(false, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_RESPOND))
        assertEquals(false, ImplementationHelper.allowsContentModifications(CalendarContract.Calendars.CAL_ACCESS_OVERRIDE))
    }

    @Test
    fun reportsNullWithoutAnAccessLevel() {
        assertNull(ImplementationHelper.allowsContentModifications(null))
    }
}
